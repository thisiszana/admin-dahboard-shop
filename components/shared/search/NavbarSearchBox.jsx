"use client";

import { useState } from "react";

import { Modal } from "antd";

import { Close, Light, Search } from "@/components/icons/Icon";
import { searchDashboard } from "@/actions/search.action";
import SearchResults from "./SearchResults";
import CustomInp from "../form/CustomInp";
import CustomBtn from "../CustomBtn";
import toast from "react-hot-toast";
import Loader from "../Loader";

export default function NavbarSearchBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setError("");
    setSearchTerm("");
    setSearchResult(null);
    setIsModalOpen(false);
  };

  const modalTitle = (
    <div className="flex items-center justify-between mb-3">
      <p>Search</p>
      <CustomBtn
        icon={<Close size={15} />}
        classNames="iconButton"
        onClick={closeModal}
      />
    </div>
  );

  const modalStyles = {
    content: {
      padding: "20px",
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!searchTerm) toast.error("Search something!");

    setLoading(() => true);
    setError(() => "");
    const result = await searchDashboard(searchTerm);
    setLoading(() => false);

    if (result.code !== 200) {
      setError(result.error?.message);
    } else {
      setSearchResult(result.result);
      console.log(result)
    }
  };

  const modalContent = (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-lightGray p-2 rounded-lg">
        <Light wrapperClassName="text-darkGray" />
        <p className="text-p2">
          <span className="font-medium mr-1">Tip.</span>
          <span className="text-gray-500">
            Search by entering a keyword and pressing Enter
          </span>
        </p>
      </div>
      <form onSubmit={submitHandler}>
        <CustomInp
          label="Search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {loading ? (
        <div className="w-full flex justify-center my-5">
          <Loader width={20} height={20} />
        </div>
      ) : (
        <SearchResults
          error={error}
          result={searchResult}
          closeModal={closeModal}
        />
      )}
    </div>
  );

  return (
    <>
      <Modal
        closeIcon={false}
        title={modalTitle}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        styles={modalStyles}
      >
        {modalContent}
      </Modal>
      <CustomBtn
        icon={<Search />}
        classNames="iconButton"
        onClick={openModal}
      />
    </>
  );
}
