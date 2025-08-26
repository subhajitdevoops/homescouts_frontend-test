import React from "react";

const Home = () => {
  return (
    <main className="main users chart-page" id="skip-target">
      <div className="container">
        <h2 className="main-title">Dashboard</h2>
        <div className="row stat-cards">
          <div className="col-md-6 col-xl-3">
            <article className="stat-cards-item">
              <div className="stat-cards-icon primary">
                <i data-feather="bar-chart-2" aria-hidden="true"></i>
              </div>
              <div className="stat-cards-info">
                <p className="stat-cards-info__num">1478 286</p>
                <p className="stat-cards-info__title">Total visits</p>
                <p className="stat-cards-info__progress">
                  <span className="stat-cards-info__profit success">
                    <i data-feather="trending-up" aria-hidden="true"></i>4.07%
                  </span>
                  Last month
                </p>
              </div>
            </article>
          </div>
          <div className="col-md-6 col-xl-3">
            <article className="stat-cards-item">
              <div className="stat-cards-icon warning">
                <i data-feather="file" aria-hidden="true"></i>
              </div>
              <div className="stat-cards-info">
                <p className="stat-cards-info__num">1478 286</p>
                <p className="stat-cards-info__title">Total visits</p>
                <p className="stat-cards-info__progress">
                  <span className="stat-cards-info__profit success">
                    <i data-feather="trending-up" aria-hidden="true"></i>0.24%
                  </span>
                  Last month
                </p>
              </div>
            </article>
          </div>
          <div className="col-md-6 col-xl-3">
            <article className="stat-cards-item">
              <div className="stat-cards-icon purple">
                <i data-feather="file" aria-hidden="true"></i>
              </div>
              <div className="stat-cards-info">
                <p className="stat-cards-info__num">1478 286</p>
                <p className="stat-cards-info__title">Total visits</p>
                <p className="stat-cards-info__progress">
                  <span className="stat-cards-info__profit danger">
                    <i data-feather="trending-down" aria-hidden="true"></i>1.64%
                  </span>
                  Last month
                </p>
              </div>
            </article>
          </div>
          <div className="col-md-6 col-xl-3">
            <article className="stat-cards-item">
              <div className="stat-cards-icon success">
                <i data-feather="feather" aria-hidden="true"></i>
              </div>
              <div className="stat-cards-info">
                <p className="stat-cards-info__num">1478 286</p>
                <p className="stat-cards-info__title">Total visits</p>
                <p className="stat-cards-info__progress">
                  <span className="stat-cards-info__profit warning">
                    <i data-feather="trending-up" aria-hidden="true"></i>0.00%
                  </span>
                  Last month
                </p>
              </div>
            </article>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-9">
            <div className="chart">
              <canvas
                id="myChart"
                aria-label="Site statistics"
                role="img"
              ></canvas>
            </div>
            <div className="users-table table-wrapper">
              <table className="posts-table">
                <thead>
                  <tr className="users-table-info">
                    <th>
                      <label className="users-table__checkbox ms-20">
                        <input type="checkbox" className="check-all" />
                        Thumbnail
                      </label>
                    </th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label className="users-table__checkbox">
                        <input type="checkbox" className="check" />
                        <div className="categories-table-img">
                          <picture>
                            <source
                              srcSet="./img/categories/01.webp"
                              type="image/webp"
                            />
                            <img src="./img/categories/01.jpg" alt="category" />
                          </picture>
                        </div>
                      </label>
                    </td>
                    <td>Starting your traveling blog with Vasco</td>
                    <td>
                      <div className="pages-table-img">
                        <picture>
                          <source
                            srcSet="./img/avatar/avatar-face-04.webp"
                            type="image/webp"
                          />
                          <img
                            src="./img/avatar/avatar-face-04.png"
                            alt="User Name"
                          />
                        </picture>
                        Jenny Wilson
                      </div>
                    </td>
                    <td>
                      <span className="badge-pending">Pending</span>
                    </td>
                    <td>17.04.2021</td>
                    <td>
                      <span className="p-relative">
                        <button
                          className="dropdown-btn transparent-btn"
                          type="button"
                          title="More info"
                        >
                          <div className="sr-only">More info</div>
                          <i
                            data-feather="more-horizontal"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="users-item-dropdown dropdown">
                          <li>
                            <a href="##">Edit</a>
                          </li>
                          <li>
                            <a href="##">Quick edit</a>
                          </li>
                          <li>
                            <a href="##">Trash</a>
                          </li>
                        </ul>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="users-table__checkbox">
                        <input type="checkbox" className="check" />
                        <div className="categories-table-img">
                          <picture>
                            <source
                              srcSet="./img/categories/02.webp"
                              type="image/webp"
                            />
                            <img src="./img/categories/02.jpg" alt="category" />
                          </picture>
                        </div>
                      </label>
                    </td>
                    <td>Start a blog to reach your creative peak</td>
                    <td>
                      <div className="pages-table-img">
                        <picture>
                          <source
                            srcSet="./img/avatar/avatar-face-03.webp"
                            type="image/webp"
                          />
                          <img
                            src="./img/avatar/avatar-face-03.png"
                            alt="User Name"
                          />
                        </picture>
                        Annette Black
                      </div>
                    </td>
                    <td>
                      <span className="badge-pending">Pending</span>
                    </td>
                    <td>23.04.2021</td>
                    <td>
                      <span className="p-relative">
                        <button
                          className="dropdown-btn transparent-btn"
                          type="button"
                          title="More info"
                        >
                          <div className="sr-only">More info</div>
                          <i
                            data-feather="more-horizontal"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="users-item-dropdown dropdown">
                          <li>
                            <a href="##">Edit</a>
                          </li>
                          <li>
                            <a href="##">Quick edit</a>
                          </li>
                          <li>
                            <a href="##">Trash</a>
                          </li>
                        </ul>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="users-table__checkbox">
                        <input type="checkbox" className="check" />
                        <div className="categories-table-img">
                          <picture>
                            <source
                              srcSet="./img/categories/03.webp"
                              type="image/webp"
                            />
                            <img src="./img/categories/03.jpg" alt="category" />
                          </picture>
                        </div>
                      </label>
                    </td>
                    <td>Helping a local business reinvent itself</td>
                    <td>
                      <div className="pages-table-img">
                        <picture>
                          <source
                            srcSet="./img/avatar/avatar-face-02.webp"
                            type="image/webp"
                          />
                          <img
                            src="./img/avatar/avatar-face-02.png"
                            alt="User Name"
                          />
                        </picture>
                        Kathryn Murphy
                      </div>
                    </td>
                    <td>
                      <span className="badge-active">Active</span>
                    </td>
                    <td>17.04.2021</td>
                    <td>
                      <span className="p-relative">
                        <button
                          className="dropdown-btn transparent-btn"
                          type="button"
                          title="More info"
                        >
                          <div className="sr-only">More info</div>
                          <i
                            data-feather="more-horizontal"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="users-item-dropdown dropdown">
                          <li>
                            <a href="##">Edit</a>
                          </li>
                          <li>
                            <a href="##">Quick edit</a>
                          </li>
                          <li>
                            <a href="##">Trash</a>
                          </li>
                        </ul>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="users-table__checkbox">
                        <input type="checkbox" className="check" />
                        <div className="categories-table-img">
                          <picture>
                            <source
                              srcSet="./img/categories/04.webp"
                              type="image/webp"
                            />
                            <img src="./img/categories/04.jpg" alt="category" />
                          </picture>
                        </div>
                      </label>
                    </td>
                    <td>Caring is the new marketing</td>
                    <td>
                      <div className="pages-table-img">
                        <picture>
                          <source
                            srcSet="./img/avatar/avatar-face-05.webp"
                            type="image/webp"
                          />
                          <img
                            src="./img/avatar/avatar-face-05.png"
                            alt="User Name"
                          />
                        </picture>
                        Guy Hawkins
                      </div>
                    </td>
                    <td>
                      <span className="badge-active">Active</span>
                    </td>
                    <td>17.04.2021</td>
                    <td>
                      <span className="p-relative">
                        <button
                          className="dropdown-btn transparent-btn"
                          type="button"
                          title="More info"
                        >
                          <div className="sr-only">More info</div>
                          <i
                            data-feather="more-horizontal"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="users-item-dropdown dropdown">
                          <li>
                            <a href="##">Edit</a>
                          </li>
                          <li>
                            <a href="##">Quick edit</a>
                          </li>
                          <li>
                            <a href="##">Trash</a>
                          </li>
                        </ul>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="users-table__checkbox">
                        <input type="checkbox" className="check" />
                        <div className="categories-table-img">
                          <picture>
                            <source
                              srcSet="./img/categories/01.webp"
                              type="image/webp"
                            />
                            <img src="./img/categories/01.jpg" alt="category" />
                          </picture>
                        </div>
                      </label>
                    </td>
                    <td>How to build a loyal community online and offline</td>
                    <td>
                      <div className="pages-table-img">
                        <picture>
                          <source
                            srcSet="./img/avatar/avatar-face-03.webp"
                            type="image/webp"
                          />
                          <img
                            src="./img/avatar/avatar-face-03.png"
                            alt="User Name"
                          />
                        </picture>
                        Robert Fox
                      </div>
                    </td>
                    <td>
                      <span className="badge-active">Active</span>
                    </td>
                    <td>17.04.2021</td>
                    <td>
                      <span className="p-relative">
                        <button
                          className="dropdown-btn transparent-btn"
                          type="button"
                          title="More info"
                        >
                          <div className="sr-only">More info</div>
                          <i
                            data-feather="more-horizontal"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="users-item-dropdown dropdown">
                          <li>
                            <a href="##">Edit</a>
                          </li>
                          <li>
                            <a href="##">Quick edit</a>
                          </li>
                          <li>
                            <a href="##">Trash</a>
                          </li>
                        </ul>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="users-table__checkbox">
                        <input type="checkbox" className="check" />
                        <div className="categories-table-img">
                          <picture>
                            <source
                              srcSet="./img/categories/03.webp"
                              type="image/webp"
                            />
                            <img src="./img/categories/03.jpg" alt="category" />
                          </picture>
                        </div>
                      </label>
                    </td>
                    <td>How to build a loyal community online and offline</td>
                    <td>
                      <div className="pages-table-img">
                        <picture>
                          <source
                            srcSet="./img/avatar/avatar-face-03.webp"
                            type="image/webp"
                          />
                          <img
                            src="./img/avatar/avatar-face-03.png"
                            alt="User Name"
                          />
                        </picture>
                        Robert Fox
                      </div>
                    </td>
                    <td>
                      <span className="badge-active">Active</span>
                    </td>
                    <td>17.04.2021</td>
                    <td>
                      <span className="p-relative">
                        <button
                          className="dropdown-btn transparent-btn"
                          type="button"
                          title="More info"
                        >
                          <div className="sr-only">More info</div>
                          <i
                            data-feather="more-horizontal"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="users-item-dropdown dropdown">
                          <li>
                            <a href="##">Edit</a>
                          </li>
                          <li>
                            <a href="##">Quick edit</a>
                          </li>
                          <li>
                            <a href="##">Trash</a>
                          </li>
                        </ul>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-3">
            <article className="customers-wrapper">
              <canvas
                id="customersChart"
                aria-label="Customers statistics"
                role="img"
              ></canvas>
              <p className="customers__title">
                New Customers <span>+958</span>
              </p>
              <p className="customers__date">28 Daily Avg.</p>
              <picture>
                <source srcSet="./img/svg/customers.svg" type="image/webp" />
                <img src="./img/svg/customers.svg" alt="" />
              </picture>
            </article>
            <article className="white-block">
              <div className="top-cat-title">
                <h3>Top categories</h3>
                <p>28 Categories, 1400 Posts</p>
              </div>
              <ul className="top-cat-list">
                <li>
                  <a href="##">
                    <div className="top-cat-list__title">
                      Lifestyle <span>8.2k</span>
                    </div>
                    <div className="top-cat-list__subtitle">
                      Dailiy lifestyle articles{" "}
                      <span className="purple">+472</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="##">
                    <div className="top-cat-list__title">
                      Tutorials <span>8.2k</span>
                    </div>
                    <div className="top-cat-list__subtitle">
                      Coding tutorials <span className="blue">+472</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="##">
                    <div className="top-cat-list__title">
                      Technology <span>8.2k</span>
                    </div>
                    <div className="top-cat-list__subtitle">
                      Dailiy technology articles{" "}
                      <span className="danger">+472</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="##">
                    <div className="top-cat-list__title">
                      UX design <span>8.2k</span>
                    </div>
                    <div className="top-cat-list__subtitle">
                      UX design tips <span className="success">+472</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="##">
                    <div className="top-cat-list__title">
                      Interaction tips <span>8.2k</span>
                    </div>
                    <div className="top-cat-list__subtitle">
                      Interaction articles <span className="warning">+472</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="##">
                    <div className="top-cat-list__title">
                      App development <span>8.2k</span>
                    </div>
                    <div className="top-cat-list__subtitle">
                      Mobile development articles{" "}
                      <span className="warning">+472</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="##">
                    <div className="top-cat-list__title">
                      Nature <span>8.2k</span>
                    </div>
                    <div className="top-cat-list__subtitle">
                      Wildlife animal articles{" "}
                      <span className="warning">+472</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="##">
                    <div className="top-cat-list__title">
                      Geography <span>8.2k</span>
                    </div>
                    <div className="top-cat-list__subtitle">
                      Geography articles <span className="primary">+472</span>
                    </div>
                  </a>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
