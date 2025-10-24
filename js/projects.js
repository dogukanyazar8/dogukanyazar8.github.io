// Project Operations Module
// Handles CRUD operations for projects

class ProjectManager {
    constructor() {
        this.projectsCollection = 'projects';
    }

    // Get all projects
    async getAllProjects() {
        try {
            const snapshot = await db.collection(this.projectsCollection)
                .orderBy('createdAt', 'desc')
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting all projects:', error);
            return [];
        }
    }

    // Get featured projects
    async getFeaturedProjects() {
        try {
            const snapshot = await db.collection(this.projectsCollection)
                .where('featured', '==', true)
                .orderBy('createdAt', 'desc')
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting featured projects:', error);
            return [];
        }
    }

    // Get project by ID
    async getProjectById(projectId) {
        try {
            const doc = await db.collection(this.projectsCollection).doc(projectId).get();
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error('Error getting project:', error);
            return null;
        }
    }

    // Create new project
    async createProject(projectData) {
        try {
            const project = {
                ...projectData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                featured: projectData.featured || false
            };
            
            const docRef = await db.collection(this.projectsCollection).add(project);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error creating project:', error);
            return { success: false, error: error.message };
        }
    }

    // Update project
    async updateProject(projectId, projectData) {
        try {
            await db.collection(this.projectsCollection).doc(projectId).update(projectData);
            return { success: true };
        } catch (error) {
            console.error('Error updating project:', error);
            return { success: false, error: error.message };
        }
    }

    // Delete project
    async deleteProject(projectId) {
        try {
            await db.collection(this.projectsCollection).doc(projectId).delete();
            return { success: true };
        } catch (error) {
            console.error('Error deleting project:', error);
            return { success: false, error: error.message };
        }
    }

    // Get projects by category
    async getProjectsByCategory(category) {
        try {
            const snapshot = await db.collection(this.projectsCollection)
                .where('category', '==', category)
                .orderBy('createdAt', 'desc')
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting projects by category:', error);
            return [];
        }
    }

    // Upload project image
    async uploadProjectImage(file) {
        try {
            const fileName = `${Date.now()}_${file.name}`;
            const storageRef = storage.ref(`project-images/${fileName}`);
            
            const snapshot = await storageRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();
            
            return { success: true, url: downloadURL };
        } catch (error) {
            console.error('Error uploading project image:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize project manager
const projectManager = new ProjectManager();
window.projectManager = projectManager;
