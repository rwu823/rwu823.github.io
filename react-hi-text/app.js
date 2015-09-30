var HiText = ReactHiText
var Find = React.createClass({
    componentDidMount(){
        document.querySelector('#search').focus()
    },

    render(){
        return (
            <div id="find">
                <input id="search" placeholder="Type some word..." onKeyUp={this.props.setHighlight}/>
                <label>
                    <input type="checkbox" value="1" onChange={this.props.setCaseSens} /> case-sensitive
                </label>
                <span id="clean" onClick = {this.props.cleanHighlight}>Clean</span>
            </div>
        )
    }
})

var App = React.createClass({
    componentDidMount(){

    },
    cleanHighlight(e){
        this.refs.hi1.clean()
        return this
    },
    setCaseSens(e){
        e.stopPropagation()
        this.refs.hi1.clean()
        this.setState({caseSens: e.currentTarget.checked})
    },
    getInitialState(){
        return {
            hi: '',
            caseSens: false
        }
    },

    setHighlight(e){
        if(e.which !== 13) return

        this.setState({hi: e.currentTarget.value})
    },
    render(){
        return (
            <div id="app">
                    <Find
                        setHighlight={this.setHighlight}
                        cleanHighlight={this.cleanHighlight}
                        setCaseSens={this.setCaseSens}
                    />
                    <div id="textbox">
                        <HiText ref="hi1" hi={this.state.hi} case-sensitive={this.state.caseSens}>
                            <p>
                            JavaScript (/ˈdʒɑːvəˌskrɪpt/[5]) is a high level, dynamic, untyped, and interpreted programming language.[6] It has been standardized in the ECMAScript language specification.[7] Alongside HTML and CSS, it is one of the three essential technologies of World Wide Web content production; the majority of websites employ it and it is supported by all modern web browsers without plug-ins.[6] JavaScript is prototype-based with first-class functions, making it a multi-paradigm language, supporting object-oriented,[8] imperative, and functional programming styles.[6] It has an API for working with text, arrays, dates and regular expressions, but does not include any I/O, such as networking, storage or graphics facilities, relying for these upon the host environment in which it is embedded.[7]
                            </p>
                            <p>
                            Despite some naming, syntactic, and standard library similarities, JavaScript and Java are otherwise unrelated and have very different semantics. The syntax of JavaScript is actually derived from C, while the semantics and design are influenced by the Self and Scheme programming languages.[9]
                            </p>
                            <p>
                            JavaScript is also used in environments that are not web-based, such as PDF documents, site-specific browsers, and desktop widgets. Newer and faster JavaScript virtual machines (VMs) and platforms built upon them have also increased the popularity of JavaScript for server-side web applications. On the client side, JavaScript has been traditionally implemented as an interpreted language, but more recent browsers perform just-in-time compilation. It is also used in game development, the creation of desktop and mobile applications, and server-side network programming with runtime environments such as Node.js.
                            </p>
                        </HiText>
                    </div>
                </div>
        )
    }
})
React.render(<App />, document.getElementById('main'))