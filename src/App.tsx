import { useEffect, useState } from "react";
import * as Tone from "tone";
import "./App.css";
import { Button, Card } from "flowbite-react";

class OSNode {
  public oscillator: Tone.Oscillator;
  public gainNode: Tone.Gain;
  public pannerNode: Tone.Panner;

  constructor(
    context: Tone.Context,
    private pitch: number,
    public gain: number,
    public pan: number,
  ) {
    this.oscillator = new Tone.Oscillator(this.pitch);
    this.gainNode = new Tone.Gain(this.gain);
    this.pannerNode = new Tone.Panner(this.pan);
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.pannerNode);
  }

  public setGain = (gain: number) => {
    this.gain = gain;
  };
}

function App() {
  const [count, setCount] = useState<number>(0);
  const [tick, setTick] = useState<OSNode>();
  const [countdown, setCountdown] = useState<OSNode>();
  const [longtone, setLongtone] = useState<OSNode>();
  const [id, setId] = useState<NodeJS.Timeout | null>();

  useEffect(() => {});

  const play = () => {
    // const ctx = new window.AudioContext();
    // const osc = new OscillatorNode(ctx, {
    //   frequency: tickConfig.pitch,
    //   type: "sine",
    // });
    // const gain = new GainNode(ctx, {
    //   gain: tickConfig.gain,
    // })
    // const pan = new PannerNode(ctx, {
    //   positionX: tickConfig.pan,
    // });
    // osc.connect(gain);
    // gain.connect(pan);
    // pan.connect(ctx.destination);
    // osc.start();
    const ctx = new Tone.Context(new window.AudioContext());
    setTick(new OSNode(ctx, 2000, 1, 0));
    tick?.pannerNode.toDestination();

    setId(
      setInterval(() => {
        tick?.oscillator.start();
        tick?.oscillator.stop("+0.1");
      }, 1000),
    );
  };

  const stop = () => {
    // oscillators?.tick?.stop();
    // oscillators?.countdown?.stop();
    // oscillators?.longtone?.stop();
    // merger?.dispose();
    // audioContext?.close();
    // Tone.Transport.stop();
    if (id) {
      clearInterval(id);
    }
    setId(null);
  };

  return (
    <>
      <div className="md:mx-16 my-4">
        <div className="grid grid-cols-3 gap-4">
          <div id="controller" className="col-span-3">
            <Button onClick={play}>play</Button>
            <Button onClick={stop}>stop</Button>
          </div>
          <div id="tick" className="col-auto">
            <Card className="card card-bordered px-4 py-4">
              <p>tick</p>
              <input
                id="default-range"
                type="range"
                max={1}
                min={-1}
                value={tick?.pan}
                step={0.1}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onChange={(e) => {
                  tick?.gainNode.gain.rampTo(Number(e.target.value), 0.05);
                }}
              />
            </Card>
          </div>
          <div id="countdown" className="col-auto">
            <Card className="card card-bordered px-4 py-4">countdown</Card>
          </div>
          <div id="longtone" className="col-auto">
            <Card className="card card-bordered px-4 py-4">longtone</Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
