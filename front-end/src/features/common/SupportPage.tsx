import { InfoCard } from "../../components/InfoCard";

export function SupportPage() {
  return (
    <div className="grid columns-2">
      <InfoCard title="Техподдержка" subtitle="Почта, телефон и рабочее время">
        <ul className="list">
          <li>support@xraydent.local</li>
          <li>+7 (999) 000-00-00</li>
          <li>Пн-Пт, 09:00-18:00</li>
        </ul>
      </InfoCard>
      <InfoCard title="FAQ и доп. услуги" subtitle="Скелет экосистемных разделов">
        <ul className="list">
          <li>FAQ по обработке снимков и статусам анализа</li>
          <li>Бот для типовых вопросов</li>
          <li className="promo">Телемедицинская консультация: UI-точка без активной оплаты</li>
        </ul>
      </InfoCard>
    </div>
  );
}
