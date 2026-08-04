export interface BibleStudyNote {
	id: string;
	username: string;
	book: string;
	chapter: number;
	verses?: string;
	study_categories: BibleStudyCategory[];
	title: string;
	notes: string;
	created_at?: Date;
}

export type BibleStudyCategory = 
"Hope" | 
"God's Character" | 
"Fear" | 
"Money" | 
"Sin" | 
"Manhood" | 
"Calling" | 
"Leadership" | 
"Fatherhood";