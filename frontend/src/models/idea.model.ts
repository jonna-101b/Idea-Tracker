export interface Idea {
    _id: string;
    title: string;
    description: string;
    tags?: string[];
    owner: string | { _id: string, name: string, email: string };
    createdAt: string;
    updatedAt: string;
}

export interface CreateIdeaPayload {
    title: string;
    description: string,
    tags?: string[];
}

export interface UpdateIdeaPayload {
    _id: string,
    title?: string;
    description?: string,
    tags?: string[];
}