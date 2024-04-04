export type SortDirType = "asc" | "desc";
export type SortByType = "popular" | "name";

export interface ITagData {
  name: string;
  count: number;
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  synonyms?: Array<string>;
}

export interface TagReturnType {
  items: Array<IData>;
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

export interface IData extends ITagData {
  collectives?: Array<ICollective>;
}

export interface ICollective {
  tags: Array<string>;
  description: string;
  link: string;
  name: string;
  slug: string;
  external_links: Array<IExternalLink>;
}

interface IExternalLink {
  type: string;
  link: string;
}
