import React, {Component} from "react";
import MyModalComponent from './modal.js';
import Pagination from './pagination.js'


class Search extends Component {


    constructor(props) {
        super(props);
        this.backendUri = 'http://localhost:8000';
        this.searchApi = '/search/posts/?';
        this.aggsApi = '/aggs/count'
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
            modalShow: false,
            modalData: {},
            queryParam: '',
            currentPage: 1,
            totalPages: null,
            totalPosts: 0,
            filteredMessageDateGteForAgg: "",
            filteredSenderUsernameForAgg: "",
            filteredChannelUsernameForAgg: "",
            filteredStockInChannelsForAgg: "",
            filteredStockInPersonsForAgg: "",
            aggsResults: []
        }
    }

    componentDidMount() {
        this.handleSearch();
    }

    handleShow = (event, post) => {

        this.setState({
            modalShow: true,
            modalData: post,
        });
    };


    handleClose = (fromModal) => {
        this.setState({
            modalShow: false
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

    handleMessageDateFromAggOnChange = event => {
        this.setState({filteredMessageDateGteForAgg: event.target.value});
        this.setState({filteredSenderUsernameForAgg: ''})
        this.setState({filteredChannelUsernameForAgg: ''})
        this.setState({filteredStockInChannelsForAgg: ''})
        this.setState({filteredStockInPersonsForAgg: ''})

    }
    handleSenderUserameAggOnChange = event => {
        this.setState({filteredSenderUsernameForAgg: event.target.value})
        this.setState({filteredChannelUsernameForAgg: ''})
        this.setState({filteredMessageDateGteForAgg: ''});
        this.setState({filteredStockInChannelsForAgg: ''})
        this.setState({filteredStockInPersonsForAgg: ''})
    }
    handleChannelUserameAggOnChange = event => {
        this.setState({filteredChannelUsernameForAgg: event.target.value})
        this.setState({filteredSenderUsernameForAgg: ''})
        this.setState({filteredMessageDateGteForAgg: ''});
        this.setState({filteredStockInChannelsForAgg: ''})
        this.setState({filteredStockInPersonsForAgg: ''})
    }

    handleStockInChannelsAggOnChange = event => {
        this.setState({filteredStockInChannelsForAgg: event.target.value});
        this.setState({filteredChannelUsernameForAgg: ''});
        this.setState({filteredSenderUsernameForAgg: ''});
        this.setState({filteredMessageDateGteForAgg: ''});
        this.setState({filteredStockInPersonsForAgg: ''});
    }

    handleStockInPersonsAggOnChange = event => {
        this.setState({filteredStockInPersonsForAgg: event.target.value});
        this.setState({filteredStockInChannelsForAgg: ''});
        this.setState({filteredChannelUsernameForAgg: ''});
        this.setState({filteredSenderUsernameForAgg: ''});
        this.setState({filteredMessageDateGteForAgg: ''});
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
        this.makeApiCall(this.backendUri + this.searchApi + '&ordering=-messageDate' + tempQueryParam);
        this.setState({currentPage: 1})
    };
    handleAggsSearch = () => {
        let tempQueryParam = '';
        if (this.state.filteredMessageDateGteForAgg) {
            tempQueryParam = '/date?messageDateFrom=' + this.state.filteredMessageDateGteForAgg;
        }
        if (this.state.filteredSenderUsernameForAgg) {
            tempQueryParam = '/sender?senderUsername=' + this.state.filteredSenderUsernameForAgg;
        }
        if (this.state.filteredChannelUsernameForAgg) {
            tempQueryParam = '/channel?channelUsername=' + this.state.filteredChannelUsernameForAgg;
        }
        if (this.state.filteredStockInChannelsForAgg) {
            tempQueryParam = '/channelByStock?stock=' + this.state.filteredStockInChannelsForAgg;
        }
        if(this.state.filteredStockInPersonsForAgg){
            tempQueryParam = '/personByStock?stock='+this.state.filteredStockInPersonsForAgg;
        }
        this.makeApiCallForAggs(this.backendUri + this.aggsApi + tempQueryParam);
    }

    makeApiCallForAggs = (searchUrl) => {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        fetch(searchUrl, {
            method: 'GET',
            headers: headers,
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                this.setState({aggsResults: data.results})


            })
            .catch(console.log)

    }


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
                this.setState({totalPosts: data.count})
                this.setState({totalPages: Math.ceil(data.count / 20)})

            })
            .catch(console.log)

    };

    onPageChanged = data => {
        const {currentPage, totalPages} = data;
        var searhcUri = this.backendUri + this.searchApi + this.state.queryParam + "&page=" + currentPage;
        this.makeApiCall(searhcUri);
        this.setState({currentPage, totalPages});
    }


    render() {
        let totalPosts = this.state.totalPosts;
        const {currentPage, totalPages} = this.state;

        const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>Stock In Social Networks Monitoring</h1>
                </div>

                {/*aggregation part*/}
                <div id='aggsPanel' className="container p-3 my-3 border">

                    <div className='row'>
                        <div className='column'>
                            <div className="row">
                                <div className="col-sm-10">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Message Date From</span>
                                        </div>
                                        <input type="datetime-local" className="form-control" id="messageDateFromForAgg"
                                               onChange={event => this.handleMessageDateFromAggOnChange(event)}
                                               value={this.state.filteredMessageDateGteForAgg}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-sm-10">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Sender Username</span>
                                        </div>
                                        <input type="text" className="form-control"
                                               placeholder='aggregation on username'
                                               onChange={event => this.handleSenderUserameAggOnChange(event)}
                                               value={this.state.filteredSenderUsernameForAgg}/>
                                    </div>
                                </div>

                            </div>
                            <div className='row'>
                                <div className="col-sm-10">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Channel Username</span>
                                        </div>
                                        <input type="text" className="form-control"
                                               placeholder='aggregation on stock in channel'
                                               onChange={event => this.handleChannelUserameAggOnChange(event)}
                                               value={this.state.filteredChannelUsernameForAgg}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-sm-10">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Stock In Channels</span>
                                        </div>
                                        <input type="text" className="form-control"
                                               placeholder='aggregation on channel by stock'
                                               onChange={event => this.handleStockInChannelsAggOnChange(event)}
                                               value={this.state.filteredStockInChannelsForAgg}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-sm-10">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Stock In Persons</span>
                                        </div>
                                        <input type="text" className="form-control"
                                               placeholder='aggregation on channel by stock'
                                               onChange={event => this.handleStockInPersonsAggOnChange(event)}
                                               value={this.state.filteredStockInPersonsForAgg}/>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <button type="button" className="btn btn-primary btn-md"
                                            onClick={this.handleAggsSearch}>Search
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='column'>
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>Stock/Sender/Group</th>
                                    <th>Count</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.aggsResults.length !== 0 ? (this.state.aggsResults.map((res) => (
                                    <tr>
                                        <td>{res[0]}</td>
                                        <td>{res[1]}</td>

                                    </tr>
                                ))) : (
                                    <div className="text-center">

                                    </div>

                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>


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
                        {totalPosts !== 0 ? (this.state.currentPosts.map((post) => (
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
                            <div className="text-center">

                            </div>

                        )}
                        </tbody>
                    </table>

                    <MyModalComponent
                        show={this.state.modalShow}
                        data={this.state.modalData}
                        onClick={this.handleClose}
                        onHide={this.handleClose}/>

                </div>

                <div id='footer' className="container p-3 my-3 border">
                    <div
                        className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
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
                            <Pagination totalRecords={totalPosts} pageNeighbours={1} pageLimit={20}
                                        onPageChanged={this.onPageChanged}/>
                        </div>
                    </div>
                </div>

            </div>


        );
    }
}

export default Search;