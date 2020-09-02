import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types'


const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
        range.push(i);
        i += step;
    }
    return range;
}

class Pagination extends Component {
    constructor(props) {
        super(props);
        var {totalRecords = null, pageLimit = 2, pageNeighbours = 0} = props;
        this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 10;
        this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
        this.pageNeighbours = typeof pageNeighbours === 'number' ?
            Math.max(0, Math.min(2, pageNeighbours)) : 0;
        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
        console.log(this.totalRecords + "innnnnnnnn" + this.pageLimit + "ddddddddd" + this.totalPages);
        this.state = {currentPage: 1 , totalRecords:0, totalPages : 0};
    }



    static getDerivedStateFromProps(props, state) {
            return { totalRecords: props.totalRecords, totalPages:Math.ceil(props.totalRecords/props.pageLimit) };
     }
    // componentDidUpdate(prevProps) {
    //     if (this.props.totalRecords != prevProps.totalRecords) {
    //         this.setState({
    //             totalRecords: this.props.totalRecords,
    //         })
    //     }
    // }


    fetchPageNumbers = () => {
        const totalPages = this.state.totalPages;
        const currentPage = this.state.currentPage;
        const pageNeighbours = this.pageNeighbours;
        const totalNumbers = (this.pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;
        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
            let pages = range(startPage, endPage);
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);
            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                    const
                    extraPages   = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }
                case (hasRightSpill && hasLeftSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }
            return [1, ...pages, totalPages];
        }
        return range(1, totalPages);
    }

    render() {
        console.log(this.state.totalRecords+"this is total record in childsssssssssssssssssssssss");
        let totalRecords = this.state.totalRecords;
        let totalPages = this.state.totalPages;
        if (!totalRecords || totalPages === 1) return null;

        const {currentPage} = this.state;
        const pages = this.fetchPageNumbers();

        return (
            <Fragment>
                <nav aria-label="Countries Pagination">
                    <ul className="pagination">
                        {pages.map((page, index) => {

                            if (page === LEFT_PAGE) return (
                                <li key={index} className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous"
                                       onClick={this.handleMoveLeft}>
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                            );

                            if (page === RIGHT_PAGE) return (
                                <li key={index} className="page-item">
                                    <a className="page-link" href="#" aria-label="Next"
                                       onClick={this.handleMoveRight}>
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            );

                            return (
                                <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                                    <a className="page-link" href="#" onClick={this.handleClick(page)}>{page}</a>
                                </li>
                            );

                        })}

                    </ul>
                </nav>
            </Fragment>
        );

    }

    componentDidMount() {
        this.gotoPage(1);
    }

    gotoPage = page => {
        const {onPageChanged = f => f} = this.props;

        const currentPage = Math.max(0, Math.min(page, this.totalPages));

        const paginationData = {
            currentPage,
            totalPages: this.state.totalPages,
            pageLimit: this.pageLimit,
            totalRecords: this.state.totalRecords
        };

        this.setState({currentPage}, () => onPageChanged(paginationData));
    }

    handleClick = page => evt => {
        evt.preventDefault();
        this.gotoPage(page);
    }

    handleMoveLeft = evt => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage - (this.pageNeighbours * 2) - 1);
    }

    handleMoveRight = evt => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage + (this.pageNeighbours * 2) + 1);
    }


}

// Pagination.prototype = {
//     totalRecords: PropTypes.number.isRequired,
//     pageLimit: PropTypes.number,
//     pageNeighbours: PropTypes.number,
//     onPageChanged: PropTypes.func
// };

export default Pagination;