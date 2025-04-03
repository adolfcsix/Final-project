import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";
import React from "react";

export default function SignUp({ title, description, imageUrl }) {
  return (
    <>
      <PageMeta
        title={title}
        description={description}
        imageUrl={imageUrl}
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
