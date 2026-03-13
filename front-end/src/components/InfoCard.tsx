import { PropsWithChildren } from "react";

type InfoCardProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export function InfoCard({ title, subtitle, children }: InfoCardProps) {
  return (
    <section className="card">
      <h3>{title}</h3>
      {subtitle ? <p className="muted">{subtitle}</p> : null}
      {children}
    </section>
  );
}
