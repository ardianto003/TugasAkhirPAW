import { NextResponse, NextRequest } from "next/server";

const getCorsHeaders = (origin) => {
  const headers = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS", // Allowing all common methods
    "Access-Control-Allow-Headers": "*", // Allowing any headers
    "Access-Control-Allow-Origin": "*", // Allowing any origin
  };

  return headers;
};

export default getCorsHeaders;
