'use client';
import { useState, useEffect, useRef, useMemo } from "react";

export const useDataDropdown = (data, value, onChange) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value) {
      const singleData = data.find((p) => p.id === value);
      setSelectedData(singleData || null);
    } else {
      setSelectedData(null);
    }
  }, [value, data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(
      (singleData) =>
        singleData?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        singleData?.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const handleInputClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleDataSelect = (singleData) => {
    setSelectedData(singleData);
    onChange(singleData.id);
    setIsOpen(false);
    setSearchTerm("");
  };

  const displayValue = selectedData ? selectedData.title : "";
  return {
    isOpen,
    searchTerm,
    selectedData,
    dropdownRef,
    filteredData,
    handleInputClick,
    handleSearchChange,
    handleDataSelect,
    displayValue,
  };
};
