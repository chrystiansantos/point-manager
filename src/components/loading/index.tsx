import logo from "@/assets/checkplant-loading.gif";

export function Loading() {
  return (
    <div
      data-testid="container-loading"
      className="bg-neutral-dark-950 fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="relative flex size-48">
        <img
          src={logo}
          alt="Checkplant Logo"
          className="size-48 object-cover"
        />
      </div>
    </div>
  );
}
