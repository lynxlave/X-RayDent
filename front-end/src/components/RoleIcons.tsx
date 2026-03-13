type IconProps = {
  className?: string;
};

export function PatientIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 12.75C14.4853 12.75 16.5 10.7353 16.5 8.25C16.5 5.76472 14.4853 3.75 12 3.75C9.51472 3.75 7.5 5.76472 7.5 8.25C7.5 10.7353 9.51472 12.75 12 12.75Z"
        fill="currentColor"
      />
      <path
        d="M4.5 19.5C4.5 16.6005 7.18629 14.25 12 14.25C16.8137 14.25 19.5 16.6005 19.5 19.5V20.25H4.5V19.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DoctorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.75C14.0711 3.75 15.75 5.42893 15.75 7.5C15.75 9.57107 14.0711 11.25 12 11.25C9.92893 11.25 8.25 9.57107 8.25 7.5C8.25 5.42893 9.92893 3.75 12 3.75Z"
        fill="currentColor"
      />
      <path
        d="M5.25 19.5C5.25 16.8076 7.71243 14.625 12 14.625C16.2876 14.625 18.75 16.8076 18.75 19.5V20.25H5.25V19.5Z"
        fill="currentColor"
      />
      <path
        d="M18.75 4.5V7.125H21.375V8.625H18.75V11.25H17.25V8.625H14.625V7.125H17.25V4.5H18.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ClinicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 3.75H15.75V20.25H6V3.75Z"
        fill="currentColor"
      />
      <path
        d="M15.75 8.25H20.25V20.25H15.75V8.25Z"
        fill="currentColor"
        opacity="0.8"
      />
      <path d="M8.25 6H9.75V7.5H8.25V6Z" fill="white" />
      <path d="M11.25 6H12.75V7.5H11.25V6Z" fill="white" />
      <path d="M8.25 9H9.75V10.5H8.25V9Z" fill="white" />
      <path d="M11.25 9H12.75V10.5H11.25V9Z" fill="white" />
      <path d="M8.25 12H9.75V13.5H8.25V12Z" fill="white" />
      <path d="M11.25 12H12.75V13.5H11.25V12Z" fill="white" />
      <path d="M17.25 10.5H18.75V12H17.25V10.5Z" fill="white" />
      <path d="M17.25 13.5H18.75V15H17.25V13.5Z" fill="white" />
      <path d="M9.75 16.5H12V20.25H9.75V16.5Z" fill="white" />
    </svg>
  );
}
