import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <p>
        Oops, no page was found, please go to <Link to="/">home page</Link>!
      </p>
    </div>
  );
}
