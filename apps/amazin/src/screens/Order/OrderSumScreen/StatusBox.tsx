import MessageBox from 'src/components/MessageBox';

type PropType = {
  textOf: string;
  isDone?: boolean;
  when?: string;
};

export default function StatusBox({ textOf, isDone, when }: PropType) {
  return (
    <>
      <MessageBox variant="success" show={isDone}>
        {`${textOf} at ${when?.slice(0, 15) ?? 'N/A'}`}
      </MessageBox>

      <MessageBox variant="danger" show={!isDone}>
        {`Not ${textOf}`}
      </MessageBox>
    </>
  );
}
