// Blog Operations Module
// Handles CRUD operations for blog posts

class BlogManager {
    constructor() {
        this.postsCollection = 'posts';
        this.categoriesCollection = 'categories';
        this.tagsCollection = 'tags';
    }

    // Get all published posts
    async getPublishedPosts(limit = null) {
        try {
            let query = db.collection(this.postsCollection)
                .where('published', '==', true)
                .orderBy('createdAt', 'desc');
            
            if (limit) {
                query = query.limit(limit);
            }
            
            const snapshot = await query.get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting published posts:', error);
            return [];
        }
    }

    // Get all posts (admin only)
    async getAllPosts() {
        try {
            const snapshot = await db.collection(this.postsCollection)
                .orderBy('createdAt', 'desc')
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting all posts:', error);
            return [];
        }
    }

    // Get post by ID
    async getPostById(postId) {
        try {
            const doc = await db.collection(this.postsCollection).doc(postId).get();
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error('Error getting post:', error);
            return null;
        }
    }

    // Get post by slug
    async getPostBySlug(slug) {
        try {
            const snapshot = await db.collection(this.postsCollection)
                .where('slug', '==', slug)
                .limit(1)
                .get();
            
            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error('Error getting post by slug:', error);
            return null;
        }
    }

    // Create new post
    async createPost(postData) {
        try {
            const post = {
                ...postData,
                slug: postData.slug || createSlug(postData.title),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                views: 0,
                readingTime: calculateReadingTime(postData.content)
            };
            
            const docRef = await db.collection(this.postsCollection).add(post);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error creating post:', error);
            return { success: false, error: error.message };
        }
    }

    // Update post
    async updatePost(postId, postData) {
        try {
            const updateData = {
                ...postData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            if (postData.content) {
                updateData.readingTime = calculateReadingTime(postData.content);
            }
            
            await db.collection(this.postsCollection).doc(postId).update(updateData);
            return { success: true };
        } catch (error) {
            console.error('Error updating post:', error);
            return { success: false, error: error.message };
        }
    }

    // Delete post
    async deletePost(postId) {
        try {
            await db.collection(this.postsCollection).doc(postId).delete();
            return { success: true };
        } catch (error) {
            console.error('Error deleting post:', error);
            return { success: false, error: error.message };
        }
    }

    // Increment view count
    async incrementViews(postId) {
        try {
            await db.collection(this.postsCollection).doc(postId).update({
                views: firebase.firestore.FieldValue.increment(1)
            });
        } catch (error) {
            console.error('Error incrementing views:', error);
        }
    }

    // Search posts
    async searchPosts(searchTerm) {
        try {
            const allPosts = await this.getPublishedPosts();
            const term = searchTerm.toLowerCase();
            
            return allPosts.filter(post => 
                post.title.toLowerCase().includes(term) ||
                post.excerpt.toLowerCase().includes(term) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(term))) ||
                post.category.toLowerCase().includes(term)
            );
        } catch (error) {
            console.error('Error searching posts:', error);
            return [];
        }
    }

    // Get posts by category
    async getPostsByCategory(category) {
        try {
            const snapshot = await db.collection(this.postsCollection)
                .where('published', '==', true)
                .where('category', '==', category)
                .orderBy('createdAt', 'desc')
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting posts by category:', error);
            return [];
        }
    }

    // Get posts by tag
    async getPostsByTag(tag) {
        try {
            const snapshot = await db.collection(this.postsCollection)
                .where('published', '==', true)
                .where('tags', 'array-contains', tag)
                .orderBy('createdAt', 'desc')
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting posts by tag:', error);
            return [];
        }
    }

    // Get related posts (by category or tags)
    async getRelatedPosts(postId, category, tags, limit = 3) {
        try {
            const snapshot = await db.collection(this.postsCollection)
                .where('published', '==', true)
                .where('category', '==', category)
                .orderBy('createdAt', 'desc')
                .limit(limit + 1)
                .get();
            
            const posts = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(post => post.id !== postId)
                .slice(0, limit);
            
            return posts;
        } catch (error) {
            console.error('Error getting related posts:', error);
            return [];
        }
    }

    // Upload image to Firebase Storage
    async uploadImage(file, path = 'blog-images') {
        try {
            const fileName = `${Date.now()}_${file.name}`;
            const storageRef = storage.ref(`${path}/${fileName}`);
            
            const snapshot = await storageRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();
            
            return { success: true, url: downloadURL };
        } catch (error) {
            console.error('Error uploading image:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize blog manager
const blogManager = new BlogManager();
window.blogManager = blogManager;
