export type Locale = "de" | "en";
export type Localized<T = string> = Record<Locale, T>;

export interface Stylist {
  id: string;
  slug: string;
  name: string;
  role: Localized;
  bio: Localized;
  specialties: Localized<string[]>;
  image: string;
  portfolio: string[];
}

export type ResolvedStylist = Omit<Stylist, "role" | "bio" | "specialties"> & {
  role: string;
  bio: string;
  specialties: string[];
};

export type ServiceCategory = "damen" | "herren" | "farbe" | "pflege";

export interface Service {
  id: string;
  category: ServiceCategory;
  name: Localized;
  price: number;
  duration: number;
}

export type ResolvedService = Omit<Service, "name"> & { name: string };
