interface IProps {
  id: string
}
export const VoiceVisualizer = ({ id }: IProps) => {
  return (
    <div className="absolute w-full flex justify-center">
      <canvas id={`canvas-${id}`} width="100" height="50" />
    </div>
  )
}
