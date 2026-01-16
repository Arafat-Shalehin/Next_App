export default function SectionHeader({
  title,
  subtitle,
  align = "left", // "left" | "center"
}) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : ""}>
      <h2 className="text-2xl sm:text-3xl font-semibold text-warmTwo">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={[
            "mt-2 text-sm text-warmTwo/85",
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl",
          ].join(" ")}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
