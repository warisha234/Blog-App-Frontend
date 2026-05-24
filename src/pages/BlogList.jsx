import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import api from "../api/axios";
import BlogCard from "../components/BlogCard";

import {
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers3,
  Clock3,
} from "lucide-react";

import "./BlogList.css";

const CATEGORIES = [
  "All",
  "Technology",
  "Lifestyle",
  "Business",
  "Travel",
  "Health",
  "Education",
  "Food",
];

export default function BlogList() {

  const [searchParams] =
    useSearchParams();

  const [category, setCategory] =
    useState("All");

  const [page, setPage] =
    useState(1);

  /* 🔥 NEW STATES */
  const [showFilter, setShowFilter] =
    useState(false);

  const [sortBy, setSortBy] =
    useState("recent");

  const search =
    searchParams.get("search") || "";

  const { data, isLoading } =
    useQuery({

      queryKey: [
        "blogs",
        page,
        category,
        search,
        sortBy,
      ],

      queryFn: async () => {

        const params =
          new URLSearchParams({
            page,
            limit: 6,
            sort: sortBy,
          });

        /* CATEGORY */
        if (
          category !== "All"
        ) {
          params.set(
            "category",
            category
          );
        }

        /* SEARCH */
        if (search) {
          params.set(
            "search",
            search
          );
        }

        const { data } =
          await api.get(
            `/blogs?${params}`
          );

        return data;
      },
    });

  return (

    <div className="blog-list-page">

      {/* GLOW */}
      <div className="list-glow glow-one"></div>
      <div className="list-glow glow-two"></div>

      {/* HEADER */}
      <div className="list-header">

        <div className="header-left">

          <div className="list-tag">
            <Sparkles size={14} />
            Explore Knowledge
          </div>

          <h1>

            {search
              ? `Results for "${search}"`
              : "Discover Stories"}

          </h1>

          <p>
            Premium articles for mental wellness,
            lifestyle, productivity and personal growth.
          </p>

        </div>

        {/* 🔥 FILTER BUTTON */}
        <button
          className="header-box"
          onClick={() =>
            setShowFilter(
              !showFilter
            )
          }
        >

          <SlidersHorizontal
            size={18}
          />

          <span>
            Most Recent
          </span>

        </button>

      </div>

      {/* 🔥 FILTER DROPDOWN */}
      {showFilter && (

        <div className="recent-filter-box">

          <button
            className={`recent-btn ${
              sortBy === "recent"
                ? "active-recent"
                : ""
            }`}
            onClick={() => {

              setSortBy(
                "recent"
              );

              setPage(1);

            }}
          >

            <Clock3 size={15} />
            Most Recent

          </button>

        </div>

      )}

      {/* CATEGORIES */}
      <div className="category-bar">

        {CATEGORIES.map(
          (cat) => (

            <button
              key={cat}
              onClick={() => {

                setCategory(cat);
                setPage(1);

              }}
              className={`cat-btn ${
                category === cat
                  ? "active"
                  : ""
              }`}
            >

              <Layers3 size={14} />
              {cat}

            </button>

          )
        )}

      </div>

      {/* CONTENT */}
      {isLoading ? (

        <div className="blog-grid">

          {[...Array(6)].map(
            (_, i) => (

              <div
                key={i}
                className="skeleton-card"
              />

            )
          )}

        </div>

      ) : (

        <>

          {/* RESULT */}
          <div className="result-info">

            <span>
              {data?.total || 0}
              {" "}
              Articles Found
            </span>

            <span className="recent-text">
              Showing Most Recent Blogs ✨
            </span>

          </div>

          {/* BLOGS */}
          <div className="blog-grid">

            {data?.blogs?.map(
              (blog) => (

                <BlogCard
                  key={blog._id}
                  blog={blog}
                />

              )
            )}

          </div>

          {/* EMPTY */}
          {data?.blogs?.length === 0 && (

            <div className="empty-state">

              <h3>
                No Articles Found
              </h3>

              <p>
                Try changing category
                or search term
              </p>

            </div>

          )}

          {/* PAGINATION */}
          {data?.pages > 1 && (

            <div className="pagination">

              <button
                onClick={() =>
                  setPage((p) =>
                    Math.max(
                      1,
                      p - 1
                    )
                  )
                }
                disabled={
                  page === 1
                }
              >

                <ChevronLeft
                  size={16}
                />

              </button>

              {[...Array(
                Math.min(
                  data.pages,
                  5
                )
              )].map((_, i) => {

                const p =
                  i + 1;

                return (

                  <button
                    key={p}
                    onClick={() =>
                      setPage(p)
                    }
                    className={
                      page === p
                        ? "active-page"
                        : ""
                    }
                  >

                    {p}

                  </button>

                );

              })}

              <button
                onClick={() =>
                  setPage((p) =>
                    Math.min(
                      data.pages,
                      p + 1
                    )
                  )
                }
                disabled={
                  page ===
                  data.pages
                }
              >

                <ChevronRight
                  size={16}
                />

              </button>

            </div>

          )}

        </>

      )}

    </div>

  );

}