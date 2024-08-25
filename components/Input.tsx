export default function ({
  type,
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  type: string;
  onChange: () => void;
}) {
  return (
    <div>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
}
