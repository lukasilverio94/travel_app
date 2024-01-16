import BackButton from "../components/BackButton";

export default function NotFound() {
  return (
    <div>
      <div className="min-h-screen container mx-5 flex flex-col items-center gap-y-2 justify-center">
        <div className="self-start mt-4 text-teal-800 text-2xl">
          Go back
          <BackButton />
        </div>
        <h1 className="text-5xl text-center">PAGE NOT FOUND</h1>
        <img
          className="max-w-[500px]"
          src="/assets/not_found.png"
          alt="not found img"
        />
      </div>
    </div>
  );
}
