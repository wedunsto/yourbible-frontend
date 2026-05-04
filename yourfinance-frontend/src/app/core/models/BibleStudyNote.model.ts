export interface BibleStudyNote {
	book: string;
	chapter: number;
	verses?: number[];
	studyCategories: BibleStudyCategory[];
	title: string;
	notes: string;
	studyDate: string;
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