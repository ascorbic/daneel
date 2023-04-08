export function getResponseStream() {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  function send(data: string) {
    writer.write(encoder.encode(data));
  }

  return {
    send,
    stream: stream.readable,
    close: () => writer.close(),
  };
}
