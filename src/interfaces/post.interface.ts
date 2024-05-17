interface MediaType {
  url: string;
  type: string;
}

export interface Post {
  id: string;
  onChainId: string;
  creator: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  remintPrice: string;
  remintToken: string;
  media: MediaType[];
}
