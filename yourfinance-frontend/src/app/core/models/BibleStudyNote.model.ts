export interface BibleStudyNote {
	id: string;
	user_id: string;
	book: string;
	chapter: number;
	verses?: string;
	study_categories: BibleStudyCategory[];
	title: string;
	notes: string;
	// Calendar day as "YYYY-MM-DD" (see core/utils/study-date.ts)
	study_date?: string;
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