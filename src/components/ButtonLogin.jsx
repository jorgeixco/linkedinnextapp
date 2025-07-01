"use client"
import React from "react";

export const ButtonLogin = () => {
    const authorizeUrl =
    "https://www.linkedin.com/oauth/v2/authorization" +
    `?response_type=code` +
    `&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI
    )}` +
    `&scope=openid%20profile%20email%20w_member_social` +
    `&state=1234`;

    return (
      <a
        href={authorizeUrl}
        className="button"
      >
        Login en LinkedIn
      </a>
    );
};