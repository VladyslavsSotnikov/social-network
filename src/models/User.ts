import { PhotosType } from "./Profile";

export type UserType = {
    id: number;
    name: string;
    status: string | null;
    photos?: PhotosType;
    followed: boolean;
}