// Estructura del usuario
export interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
  bio: string;
  avatar_url: string;
  location: string;
  banner: string;
}

export interface UpdateUser {
  id: string;
  full_name: string;
  username: string;
  bio: string;
  avatar_url: string | null;
  location: string;
  banner: string | null;
}

// Estructura del post
export interface Post {
  id: string;
  description: string;
  image: string;
  user_id: string;
  created_at: string;
}

export interface InsertPost {
  description: string;
  image: string | null | undefined;
  user_id: string | null | undefined;
}

export interface UpdatePost {
  description: string;
  image: string;
  id: number;
}

interface Profile {
  full_name: string;
  avatar_url: string;
}

export interface PostsLiked {
  id: string;
  user_id: string;
  post_id: string;
  post: Post;
}

export interface PostsSaved {
  id: string;
  user_id: string;
  post_id: string;
  post: Post;
}

// Estructura de la tabla Me gusta
export interface Like {
  id: string;
  user_id: string;
  post_id: string;
  profiles: Profile;
}

// Estructura de la tabla Guardados
interface Save {
  id: string;
  id_user: string;
  id_post: string;
}

// Ejemplos de usuarios
export const users: User[] = [
  {
    id: "user1",
    full_name: "Juan Pérez",
    username: "juanp",
    email: "juanp@example.com",
    bio: "Aficionado a la tecnología",
    avatar_url:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Buenos Aires, Argentina",
    banner: "",
  },
  {
    id: "user2",
    full_name: "María López",
    username: "marial",
    email: "marial@example.com",
    bio: "Amante de la fotografía",
    avatar_url:
      "https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Cali, Colombia",
    banner: "",
  },
];

// Ejemplos de posts
export const posts: Post[] = [
  {
    id: "post1",
    description: "Este es el contenido de mi primer post.",
    image:
      "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg",
    user_id: "user1",
    created_at: "hace 1 hora",
  },
  {
    id: "post2",
    description: "Un viaje por los paisajes más bellos.",
    image:
      "https://cdn.pixabay.com/photo/2024/07/05/22/30/penguin-8875750_960_720.jpg",
    user_id: "user2",
    created_at: "hace 1 hora",
  },
];

// Ejemplos de Me gusta
export const likes: Like[] = [
  {
    id: "like1",
    user_id: "user2",
    post_id: "post1",
    profiles: { full_name: "", avatar_url: "" },
  },
  {
    id: "like2",
    user_id: "user1",
    post_id: "post2",
    profiles: { full_name: "", avatar_url: "" },
  },
];

// Ejemplos de Guardados
export const saves: Save[] = [
  {
    id: "save1",
    id_user: "user1",
    id_post: "post2",
  },
  {
    id: "save2",
    id_user: "user2",
    id_post: "post1",
  },
];
