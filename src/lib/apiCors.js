import { NextResponse, NextRequest } from "next/server";

const getCorsHeaders = (origin) => {
  const headers = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS", 
    "Access-Control-Allow-Headers": "*", 
    "Access-Control-Allow-Origin": "*", 
  };

  return headers;
};

export default getCorsHeaders;
