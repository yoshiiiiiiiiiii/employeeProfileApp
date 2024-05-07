import { FC, memo } from "react";
import { Link } from "react-router-dom";

export const Page404: FC = memo(() => {
  return (
    <div>
      <h3>ページが見つかりません</h3>
      <Link
        to="/"
      >
        ログイン画面へ戻る
      </Link>
    </div>
  );
});
