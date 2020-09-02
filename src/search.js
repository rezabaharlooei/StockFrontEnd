import React, {Component} from "react";
import MyModalComponent from './bootstrap-modal.component.js';
import Pagination from './pagination.js'


class Search extends Component {


    constructor(props) {
        super(props);
        this.backendUri = 'http://localhost:8000';
        this.searchApi = '/search/posts/?';
        this.state = {
            currentPosts: [],
            response: {},
            filteredStock: "",
            filteredSource: "",
            filteredSentiment: "",
            filteredContent: "",
            filteredChannelName: "",
            filteredSenderName: "",
            filteredMessageDateGte: "",
            filteredMessageDateLte: "",
            show: false,
            data: {},
            queryParam: '',
            currentPage: null,
            totalPages: null,
            totalPosts:0

      };
    }




    componentDidMount() {
        console.log("before did mount ")
         this.makeApiCall(this.backendUri + this.searchApi);
        console.log(this.state.response.count+' this is in after Mouuuuuuuuuunt');
    }



    handleShow = (event, post) => {

        this.setState({
            show: true,
            data: post,
        });
    };


    handleClose = (fromModal) => {
        this.setState({
            show: false
        });
    };

    handleStockSymbolOnChange = event => {
        this.setState({filteredStock: event.target.value});
    };

    handleSourceOnChange = event => {
        this.setState({filteredSource: event.target.value});
    }

    handleSentimentOnChange = event => {
        this.setState({filteredSentiment: event.target.value});
    }

    handleContentOnChange = event => {
        this.setState({filteredContent: event.target.value})
    }

    handleChannelNameOnChange = event => {
        this.setState({filteredChannelName: event.target.value})
    }

    handleSenderNameOnChange = event => {
        this.setState({filteredSenderName: event.target.value})
    }

    handleMessageDateFromOnChange = event => {
        this.setState({filteredMessageDateGte: event.target.value})
    }

    handleMessageDateToOnChange = event => {
        this.setState({filteredMessageDateLte: event.target.value})
    }
    handleSearch = () => {

        var tempQueryParam = '';
        if (this.state.filteredStock) {
            tempQueryParam = tempQueryParam + '&stock=' + this.state.filteredStock;
        }
        if (this.state.filteredSource) {
            tempQueryParam = tempQueryParam + '&source=' + this.state.filteredSource;
        }
        if (this.state.filteredSentiment) {
            tempQueryParam = tempQueryParam + '&sentiment=' + this.state.filteredSentiment;
        }
        if (this.state.filteredContent) {
            tempQueryParam = tempQueryParam + '&content=' + this.state.filteredContent;
        }
        if (this.state.filteredChannelName) {
            tempQueryParam = tempQueryParam + '&channelName=' + this.state.filteredChannelName;
        }
        if (this.state.filteredSenderName) {
            tempQueryParam = tempQueryParam + '&senderName=' + this.state.filteredSenderName;
        }
        if (this.state.filteredMessageDateGte) {
            tempQueryParam = tempQueryParam + '&messageDate__gte=' + this.state.filteredMessageDateGte;
        }
        if (this.state.filteredMessageDateLte) {
            tempQueryParam = tempQueryParam + '&messageDate__lte=' + this.state.filteredMessageDateLte;
        }
        this.setState({queryParam: tempQueryParam})
        this.makeApiCall(this.backendUri + this.searchApi + tempQueryParam);
    };


    makeApiCall = searchUrl => {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        fetch(searchUrl, {
            method: 'GET',
            headers: headers,
        })
            .then(res => res.json())
            .then((data) => {
                 this.setState({currentPosts: data.results})
                 this.setState({response: data})
                 this.setState({totalPosts : data.count})
                 this.setState({totalPages:Math.ceil(data.count/2)})
            })
            .catch(console.log)

    };

    onPageChanged = data => {
        const {currentPage, totalPages} = data;
        var searhcUri = this.backendUri + this.searchApi + this.state.queryParam + "&page=" + currentPage;
        const response = this.makeApiCall(searhcUri);
        this.setState({response:response})
        // this.setState({totalPages:Math.ceil(this.state.response)})
        this.setState({currentPage, totalPages});
    }


    render() {
        //  const pageCount = (this.state.response.count / 10) + 1;
        // const paginationPageNumberItems = [];
        // for (var i = 1; i <= pageCount; i++) {
        //     paginationPageNumberItems.push(<li className="page-item"><a className="page-link" href='#'
        //                                                               //  onClick={(event) => this.handlePageOnClick(event, i)}
        //     >{i}</a></li>)

        let totalPosts = this.state.totalPosts;
         console.log(this.state.totalPosts == 0 +' bbbbbbbbbbbbbbbbb');
        if (totalPosts === 0) return null;
        const {currentPage, totalPages} = this.state;


        console.log(totalPosts + 'dar searchchchhchc');
        console.log(totalPages+"totalPages in search component");
        console.log(this.state.response+'response in search component');
        // }
        const style = totalPosts > 2 ? {} : {display: 'none'};


        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>Welcome to stock public opinion analyzer </h1>
                </div>

                <div id='searchPanel' className="container p-3 my-3 border">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Stock Symbol</span>
                                </div>
                                <input type="text" className="form-control" placeholder='filter by stock symbol'
                                       onChange={event => this.handleStockSymbolOnChange(event)}
                                       value={this.state.filteredStock}/>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Source</span>
                                </div>
                                <select className="form-control" id="sourceSelector"
                                        value={this.state.filteredSource}
                                        onChange={event => this.handleSourceOnChange(event)}>
                                    <option defaultValue value="">All</option>
                                    <option value='Telegram'>Telegram</option>
                                    <option value='Sahamyab'>Sahamyab</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Sentiment</span>
                                </div>
                                <select className="form-control" id="sentimentSelector"
                                        value={this.state.filteredSentiment}
                                        onChange={event => this.handleSentimentOnChange(event)}>
                                    <option defaultValue value="">All</option>
                                    <option value='Positive'>Positive</option>
                                    <option value='Negative'>Negative</option>
                                    <option value='Neutral'>Neutral</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-sm-4">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Content</span>
                                </div>
                                <input type="text" className="form-control" placeholder='message contain'
                                       onChange={event => this.handleContentOnChange(event)}
                                       value={this.state.filteredContent}/>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Channel Name</span>
                                </div>
                                <input type="text" className="form-control" placeholder='filter by channel name'
                                       onChange={event => this.handleChannelNameOnChange(event)}
                                       value={this.state.filteredChannelName}/>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Sender Name</span>
                                </div>
                                <input type="text" className="form-control" placeholder='filter by sender name'
                                       onChange={event => this.handleSenderNameOnChange(event)}
                                       value={this.state.filteredSenderName}/>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-sm-5">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Message Date From</span>
                                </div>
                                <input type="datetime-local" className="form-control" id="messageDateFrom"
                                       onChange={event => this.handleMessageDateFromOnChange(event)}
                                       value={this.state.filteredMessageDateGte}/>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Message Date To</span>
                                </div>
                                <input type="datetime-local" className="form-control" id="messageDateTo"
                                       onChange={event => this.handleMessageDateToOnChange(event)}
                                       value={this.state.filteredMessageDateLte}/>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-primary btn-md"
                                    onClick={this.handleSearch}>Search
                            </button>
                        </div>
                    </div>

                </div>

                <div id='searchResult' className="container p-3 my-3 border">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Stock Symbol</th>
                            <th>Source</th>
                            <th>Channel Name</th>
                            <th>Sender Name</th>
                            <th>Sentiment</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.response ? (this.state.currentPosts.map((post) => (
                            <tr>
                                <td>{post.stock}</td>
                                <td>{post.source}</td>
                                <td>{post.channelName}</td>
                                <td>{post.senderName}</td>
                                <td>{post.sentiment}</td>
                                <td>{post.messageDate}</td>
                                <td>
                                    <button type="button" className="btn btn-primary btn-md"
                                            onClick={(event) => this.handleShow(event, post)}>
                                        Show More
                                    </button>
                                </td>
                            </tr>
                        ))) : (
                            <p>Try searching for a meal</p>
                        )}
                        </tbody>
                    </table>

                    <MyModalComponent
                        show={this.state.show}
                        data={this.state.data}
                        onClick={this.handleClose}
                        onHide={this.handleClose}/>

                </div>

                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between"
                     style={style}>
                    <div className="d-flex flex-row align-items-center">
                        <h2 className={headerClass}>
                            <strong className="text-secondary">{totalPosts}</strong> Posts
                        </h2>
                        {currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                              Page <span className="font-weight-bold">{currentPage}</span> / <span
                                className="font-weight-bold">{totalPages}</span>
                            </span>
                        )}

                    </div>

                    <div className="d-flex flex-row py-4 align-items-center">
                        {console.log("rerender chillllllllllllllddddddddd")}
                        <Pagination totalRecords={totalPosts} pageNeighbours={1} pageLimit={2}
                                    onPageChanged={this.onPageChanged}/>
                    </div>
                </div>


                {/*<div id='footer' className="container p-3 my-3 border" style={style}>*/}
                {/*    <ul className="pagination justify-content-center">*/}
                {/*        <li className="page-item"><a className="page-link" href="#">Previous</a></li>*/}
                {/*        {paginationPageNumberItems}*/}
                {/*        <li className="page-item"><a className="page-link" href="#">Next</a></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}

            </div>


        );
    }
}

export default Search;