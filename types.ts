
export interface PhotoExample {
  title: string;
  intro?: string; // 新增：原則簡介
  goodImage: string;
  badImage: string;
  goodPoints: string[];
  badPoints: string[];
  coachComment: string;
}

export interface BioExample {
  role: string;
  keywords: string;
  headerNote?: string; // 新增：撰寫原則提示
  goodBio: string;
  badBio: string;
  coachComment: string;
  // 移除 analysis，改為直接在 coachComment 中呈現完整分析
}

export interface SopSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  authorImage: string;
  authorName: string;
  authorTitle: string;
  authorBio: string;
  heroImage?: string;
}
