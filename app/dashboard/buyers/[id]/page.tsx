import UserAccount from "@/components/user-accounts/user-account";

export default function page({ params }: any) {
  const id = params?.id;

  return (
    <div>
      <UserAccount userId={id} />
    </div>
  );
}
