import { Pagination } from "react-bootstrap";
import "./PaginationComp.css";

type Props = {
	currentPage: number;
	totalPage: number;
	onPageChange: (pageNumber: number) => void; // Function to handle page change
};

function PaginationComp(props: Props) {
	const { currentPage, totalPage, onPageChange } = props;
	let items = [];

	for (let number = 1; number <= totalPage; number++) {
		items.push(
			<Pagination.Item
				key={number}
				active={number === currentPage}
				onClick={() => onPageChange(number)}
			>
				{number}
			</Pagination.Item>
		);
	}

	return <Pagination className="">{items}</Pagination>;
}

export default PaginationComp;
