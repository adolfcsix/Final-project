import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import React from "react";

export default function SignIn({ title, description, imageUrl }) {
  return (
    <>
      <PageMeta
        title={title}
        description={description}
        imageUrl={imageUrl}
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
