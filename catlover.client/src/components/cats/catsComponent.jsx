import React, { Component } from "react";
import CatComponent from "./catComponent";
import LoadingComponent from "../loading/loadingComponent";
import ErrorComponent from "../error/errorComponent";
import PageTitleComponent from "../pageTitle/pageTitleComponent";
import PaginationComponent from "../pagination/paginationComponent";

class CatsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      catsPerPage: 10,
      error: null,
      isLoaded: false,
      message: String,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:10000/cats")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            message: result.message,
            items: result.data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { currentPage, catsPerPage, error, isLoaded, message, items } =
      this.state;
    const indexOfLastCat = currentPage * catsPerPage;
    const indexOfFirstCat = indexOfLastCat - catsPerPage;
    const currentCats = items.slice(indexOfFirstCat, indexOfLastCat);
    const paginate = (pageNum) => this.setState({ currentPage: pageNum });
    const nextPage = () => this.setState({ currentPage: currentPage + 1 });
    const prevPage = () => this.setState({ currentPage: currentPage - 1 });

    if (error) {
      return (
        <div>
          <ErrorComponent errorMessage={error.message} />
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div>
          <LoadingComponent />
        </div>
      );
    } else {
      return (
        <div className="container">
          <PageTitleComponent title={message} />
          <div className="card-group m-2">
            <div className="row">
              {currentCats.map((item) => (
                <div key={item.id} className="col-lg-2 col-md-6 col-sm-6">
                  <div className="card img-thumbnail d-flex align-items-start bg-light mb-3">
                    <div className="card-body">
                      <CatComponent
                        catId={item.id}
                        photoUrl={item.photoUrl}
                        breedId={item.breedId}
                        isFavorite={item.isFavorite}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <PaginationComponent
                catsPerPage={catsPerPage}
                totalCats={items.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CatsComponent;
