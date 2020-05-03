class Watch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running : false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        
        this.start = this.start.bind(this);
        this.step = this.step.bind(this);
        this.calculate = this.calculate.bind(this);
        this.format = this.format.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this); 
    }

    start(watch) {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    step() {
        if (this.running) return;
        this.calculate()
    } 
    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        };
        document.getElementById("display").innerText = this.format(this.state.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    
    function pad0(value) {
        let result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }  
    }

    stop() {
        this.state.running = false;
        clearInterval(this.watch);
    }

    reset() {
        clearInterval(this.watch);
        this.state.running = false;
        this.state.times.minutes = 0;
        this.state.times.seconds = 0;
        this.state.times.miliseconds = 0;
        document.getElementById("display").innerText = this.format(this.state.times);
    }
    
    render() {

        return (
            <div>
                <button onClick={this.start}>Start</button>
                <button onClick={this.stop}>Stop</button>
                <button onClick={this.reset}>Reset</button>
            </div>
        )
    }
};

class Timer extends React.Component {

    render() {
        return (
            <h1 id='display'>00:00:00</h1>
        )
    }
};

class App extends React.Component {

    render() {
        return (
            <div>
                <Watch />
                <Timer />
            </div>
        )
    }
}