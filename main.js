//enums
const ModeEnum = 
{
    ADDITION: 0,
    // SUBTRACTION: 1,
    // MULTIPLICATION: 2,
    // DIVISION: 3
}

//classes
class ExampleEntry
{
    constructor(exampleStr, answer, userAnswer, time, wasCorrect)
    {
        this.exampleStr = exampleStr
        this.answer = answer
        this.userAnswer = userAnswer
        this.time = time
        this.wasCorrect = wasCorrect
    }
}

class Mode
{
    constructor(min, max, numbersExampleAmount, floatingPointMode, maxNumbersAfterPoint)
    {
        this.min = min
        this.max = max
        this.numbersExampleAmount = numbersExampleAmount
        this.floatingPointMode = floatingPointMode
        this.maxNumbersAfterPoint = maxNumbersAfterPoint
        this.currentValues = []
    }

    _generate()
    {
        let temp = Math.random() * (this.max - this.min) + this.min
        if(this.floatingPointMode)
        {
            temp = temp.toFixed(this.maxNumbersAfterPoint)
        }
        else
        {
            temp = Math.floor(temp)
        }
        temp = parseFloat(temp)
        return temp
    }

    generateExample()
    {
        for(let i=0; i<this.numbersExampleAmount; i++)
        {
            this.currentValues[i] = this._generate()
        }
        this.result = 0
    }
    stringify(symbol)
    {
        let temp = ""
        for(let i=0; i<this.numbersExampleAmount; i++)
        {
            temp += this.currentValues[i]
            if(i != this.numbersExampleAmount - 1)
            {
                temp += symbol
            }
        }
        return temp
    }
}

class AdditionMode extends Mode
{
    generateExample()
    {
        super.generateExample()
        this.currentValues.forEach(element => {
           this.result += element 
        });
    }
    stringify()
    {
        return super.stringify(" + ")
    }
}

//variables
const settings = 
{
    mode: null,
    roundsAmount: null,
    min: null,
    max: null,
    numbersExampleAmount: null,
    floatingPointMode: null,
    maxNumbersAfterPoint: null,
    ui:
    {
        settings: null,
        mode: null,
        roundsAmount: null,
        min: null,
        max: null,
        numbersExampleAmount: null,
        floatingPointMode: null,
        maxNumbersAfterPoint: null,
        startBtn: null,
        aboutBtn: null
    }
}

const game = 
{
    isStarted: null,
    roundCounter: null,
    timerCounter: null,
    interval: null,
    generator: null,
    allExamples: [],
    ui:
    {
        game: null,
        roundCounter: null,
        timerCounter: null,
        exampleHolder: null,
        exampleHolderContent: null,
        enterAnswer: null,
        enterBtn: null,
        aboutGameBtn: null
    }
}

const result = 
{

}

//functions

//general
function compareNumbers(a, b)
{
    console.log(Math.abs(a - b) < Number.EPSILON)
    console.log(a)
    console.log(b)
    console.log(a - b)
    return Math.abs(a - b) < Number.EPSILON
}

//settings
function initSettings()
{
    settings.mode = ModeEnum.ADDITION,
    settings.roundsAmount = 1;
    settings.min = 1;
    settings.max = 10;
    settings.numbersExampleAmount = 2;
    settings.floatingPointMode = false;
    settings.maxNumbersAfterPoint = 1;
}

function initSettingsUI()
{
    settings.ui.settings = $('.settings')
    settings.ui.mode = $(".mode")
    settings.ui.roundsAmount = $(".roundsAmount")
    settings.ui.min = $(".min")
    settings.ui.max = $(".max")
    settings.ui.floatingPointMode = $(".floatingPointMode")
    settings.ui.maxNumbersAfterPoint = $(".maxNumbersAfterPoint")
    settings.ui.numbersExampleAmount = $(".numbersExampleAmount")
    settings.ui.startBtn = $('.startBtn')
    settings.ui.mode.val(settings.mode)
    settings.ui.roundsAmount.val(settings.roundsAmount) 
    settings.ui.min.val(settings.min)
    settings.ui.max.val(settings.max)
    settings.ui.floatingPointMode.attr('state', settings.floatingPointMode)
    settings.ui.maxNumbersAfterPoint.val(settings.maxNumbersAfterPoint)
    settings.ui.numbersExampleAmount.val(settings.numbersExampleAmount)
}

function initSettingsActions()
{
    settings.ui.roundsAmount.on("input", (e) => 
    {
        let temp = settings.ui.roundsAmount.val()
        if(temp != "")
        {
            if(Number(temp) <= 0)
            {
                settings.ui.roundsAmount.val(1)
            }
        }
    })
    
    settings.ui.roundsAmount.on("focusout", (e) => 
    {
        if(settings.ui.roundsAmount.val() == "")
        {
            settings.ui.roundsAmount.val(1)
        }
    })
        
    settings.ui.min.on("input", (e) => 
    {
        let min = settings.ui.min.val()
        let max = settings.ui.max.val()

        if(max != "")
        {
            if(parseFloat(max) < parseFloat(min))
            {
                settings.ui.max.val(parseFloat(min))
            }
        }
    })
        
    settings.ui.min.on("focusout", (e) => 
    {
        if(settings.ui.min.val() == "")
        {
            settings.ui.min.val(settings.ui.max.val())
        }
    })

    settings.ui.max.on("input", (e) => 
    {
        let min = settings.ui.min.val()
        let max = settings.ui.max.val()

        if(max != "")
        {
            if(parseFloat(min) > parseFloat(max))
            {
                settings.ui.min.val(parseFloat(max))
            }
        }
    })

    settings.ui.max.on("focusout", (e) => 
    {
        if(settings.ui.max.val() == "")
        {
            settings.ui.max.val(settings.ui.min.val())
        }
    })
    
    settings.ui.numbersExampleAmount.on("input", (e) => 
    {
        let temp = settings.ui.numbersExampleAmount.val()
        if(temp != "")
        {
            if(Number(temp) < 2)
            {
                settings.ui.numbersExampleAmount.val(2)
            }
        }
    })

    settings.ui.numbersExampleAmount.on("focusout", (e) => 
    {
        if(settings.ui.numbersExampleAmount.val() == "")
        {
            settings.ui.numbersExampleAmount.val(2)
        }
    })

    settings.ui.floatingPointMode.on("click", () => 
    {
        if(settings.ui.floatingPointMode.hasClass("disabled"))
        {
            settings.ui.floatingPointMode.removeClass("disabled").addClass("enabled")
            settings.ui.maxNumbersAfterPoint.removeAttr('disabled')
            settings.ui.floatingPointMode.attr('data-state', true)
        }
        else
        {
            settings.ui.floatingPointMode.removeClass("enabled").addClass("disabled")
            settings.ui.maxNumbersAfterPoint.attr('disabled', 'disabled');
            settings.ui.floatingPointMode.attr('data-state', false)
        }
    })
        
    settings.ui.startBtn.on('click', () => 
    {
        settings.mode = parseInt(settings.ui.mode.val())
        settings.roundsAmount = parseInt(settings.ui.roundsAmount.val())
        settings.min = parseFloat(settings.ui.min.val())
        settings.max = parseFloat(settings.ui.max.val())
        settings.floatingPointMode = settings.ui.floatingPointMode.attr("data-state") == "true"
        settings.maxNumbersAfterPoint = parseInt(settings.ui.maxNumbersAfterPoint.val())
        settings.numbersExampleAmount = parseInt(settings.ui.numbersExampleAmount.val())
        settings.ui.settings.fadeOut(500, () => 
        {
            startFormatGameUI()
            $('.game').fadeIn(500, () => 
            {
                startGame()
            }).css("display","flex")
        })
    })
}

//game
function initGame()
{
    game.roundCounter = 1
    game.isStarted = false
    game.timerCounter = 0
    game.generator = null
    game.allExamples = []
}

function initGameUI()
{
    game.ui.game = $('.game')
    game.ui.roundCounter = $('.roundCounter')
    game.ui.timerCounter = $('.timerCounter')
    game.ui.exampleHolder = $('.exampleHolder')
    game.ui.exampleHolderContent = $('.exampleHolderContent')
    game.ui.enterAnswer = $('.enterAnswer')
    game.ui.enterBtn = $('.enterBtn')
    game.ui.aboutGameBtn = $('.aboutGameBtn')
}

function chooseGameMode(mode)
{
    switch(mode)
    {
        case ModeEnum.ADDITION:
        {
            game.generator = new AdditionMode(
                settings.min,
                settings.max,
                settings.numbersExampleAmount,
                settings.floatingPointMode,
                settings.maxNumbersAfterPoint
            )
            break;
        }
    }
}

function enterAnswerAndNextExample()
{
    if(game.isStarted)
    {
        game.ui.roundCounter.html(`${game.roundCounter}/${settings.roundsAmount}`)
        let answer = parseFloat(game.ui.enterAnswer.val())
        if(compareNumbers(answer, game.generator.result))
        {
            game.allExamples.push(new ExampleEntry(
                game.generator.stringify,
                game.generator.result,
                answer,
                game.timerCounter,
                true
            ))
            game.ui.exampleHolder.removeClass('lastAnswerIncorrect')
            game.ui.exampleHolder.addClass('lastAnswerCorrect')
        }
        else
        {
            game.allExamples.push(new ExampleEntry(
                game.generator.stringify,
                game.generator.result,
                answer,
                game.timerCounter,
                false
            ))
            game.ui.exampleHolder.removeClass('lastAnswerCorrect')
            game.ui.exampleHolder.addClass('lastAnswerIncorrect')
        }
        game.timerCounter = 0
        game.roundCounter += 1
        if(!game.roundCounter > settings.roundsAmount)
        {
            game.generator.generateExample()
            game.ui.exampleHolderContent.html(game.generator.stringify())
        }
        else
        {
            clearInterval(game.interval)
            game.isStarted = false
            game.ui.game.fadeOut(500, () => 
            {
                settings.ui.settings.fadeIn(500)
            })
        }
    }
}

function initGameActions()
{   
    game.ui.enterBtn.on('click', enterAnswerAndNextExample)

    game.ui.enterAnswer.on("keypress", (e) => 
    {
        if(e.originalEvent.key == "Enter")
        {
            enterAnswerAndNextExample()
        }
    })
}

function startFormatGameUI()
{
    game.ui.roundCounter.html(`1/${settings.roundsAmount}`)
    game.ui.timerCounter.html("0 s")
    game.ui.exampleHolderContent.html("Start in 5 seconds...")
}

function startGame()
{
    let counter = 6
    game.isStarted = false
    chooseGameMode(settings.mode)
    game.allExamples = []
    game.generator.generateExample()
    game.interval = setInterval(() => 
    {
        counter -= 1
        game.ui.exampleHolderContent.html(`Start in ${counter} seconds...`)
        if(counter == 0)
        {
            clearInterval(game.interval)
            game.interval = setInterval(() => 
            {
                game.timerCounter += 0.01
                game.timerCounter = Number(game.timerCounter.toFixed(3))
                game.ui.timerCounter.html(game.timerCounter)
            }, 10)
            game.ui.exampleHolderContent.html(game.generator.stringify())
            game.isStarted = true
        }
    }, 1000)
}


//main
$(window).on('load', (e) => 
    {
        initSettings()
        initSettingsUI()
        initSettingsActions()

        initGame()
        initGameUI()
        initGameActions()
    }
)