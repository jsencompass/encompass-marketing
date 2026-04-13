export interface Author {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const authors: Record<string, Author> = {
  joe: {
    name: "Joe Dudek",
    role: "Operations & Governance",
    bio: "35+ years in parking. Ran LAX parking — $85M revenue, 800+ employees. Leads governance at Encompass.",
    initials: "JD",
  },
  jason: {
    name: "Jason Scott",
    role: "Delivery & Assurance",
    bio: "20+ years in parking operations and project management. 800+ projects, $150M+ installation value. Leads delivery at Encompass.",
    initials: "JS",
  },
  steven: {
    name: "Steven Grant",
    role: "Technology & Architecture",
    bio: "Oracle, Booz Allen, LTK Engineering. Five major airport deployments. Leads technology architecture at Encompass.",
    initials: "SG",
  },
  encompass: {
    name: "Encompass Parking",
    role: "Controllership for Parking Revenue",
    bio: "Encompass is the controllership layer for parking assets — reconciling revenue, governing exceptions, and continuously improving NOI.",
    initials: "EP",
  },
};
