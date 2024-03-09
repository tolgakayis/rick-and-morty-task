export interface Paginate<T> {
	info: {
		count: number; //	The length of the response
		pages: number; //	The amount of pages
		next: string; //(url)	Link to the next page (if it exists)
		prev: string; //(url)	Link to the previous page (if it exists)
	};
	results: T[];
}
