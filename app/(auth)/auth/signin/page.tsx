import SignInCard from "./signin-card";

export default async function SignIn() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <SignInCard></SignInCard>
      </div>
    </>
  );
}
