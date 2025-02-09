const Mode = 
{
    ADDITION: 0,
    SUBTRACTION: 1,
    MULTIPLICATION: 2,
    DIVISION: 3,
    ALL: 4
}

const GameSettings = 
{
    mode: Mode.ADDITION,
    rounds: 1,
    min: 1,
    max: 10,
    floatingPointMode: false,
    maxNumbersAfterPoint: 1,
    getValuesFromInterface(temp)
    {
        this.mode = temp.mode.val()
        this.rounds = temp.rounds.val()
        this.min = temp.min.val()
        this.max = temp.max.val()
        console.log(temp.floatingPointMode.attr("data-state"))
        this.floatingPointMode = temp.floatingPointMode.attr("data-state") == "true"
        this.maxNumbersAfterPoint = temp.maxNumbersAfterPoint.val()
    }
}

const GameSettingsElements = 
{
    settings: null,
    mode: null,
    rounds: null,
    min: null,
    max: null,
    floatingPointMode: null,
    maxNumbersAfterPoint: null,
    startBtn: null,
    initValues(temp)
    {
        this.settings = $('.settings')
        this.mode = $(".mode")
        this.rounds = $(".roundsAmount")
        this.min = $(".min")
        this.max = $(".max")
        this.floatingPointMode = $(".floatingPointMode")
        this.maxNumbersAfterPoint = $(".maxNumbersAfterPoint")
        this.startBtn = $('.startBtn')
        this.mode.val(temp.mode)
        this.rounds.val(temp.rounds) 
        this.min.val(temp.min)
        this.max.val(temp.max)
        this.floatingPointMode.attr('state', temp.floatingPointMode)
        this.maxNumbersAfterPoint.val(temp.maxNumbersAfterPoint)
    },
    initActions(obj)
    {
        this.rounds.on("input", (e) => 
        {
            let temp = this.rounds.val()
            if(temp != "")
            {
                if(Number(temp) <= 0)
                {
                    this.rounds.val(1)
                }
            }
        })

        this.rounds.on("focusout", (e) => 
        {
            if(this.rounds.val() == "")
            {
                this.rounds.val(1)
            }
        })
        
        this.min.on("input", (e) => 
        {
            let min = this.min.val()
            let max = this.max.val()

            if(max != "")
            {
                if(parseInt(max) < parseInt(min))
                {
                    this.max.val(parseInt(min))
                }
            }
        })
        
        this.min.on("focusout", (e) => 
        {
            if(this.min.val() == "")
            {
                this.min.val(this.max.val())
            }
        })

        this.max.on("input", (e) => 
        {
            let min = this.min.val()
            let max = this.max.val()

            if(max != "")
            {
                if(parseInt(min) > parseInt(max))
                {
                    this.min.val(parseInt(max))
                }
            }
        })

        this.max.on("focusout", (e) => 
        {
            if(this.max.val() == "")
            {
                this.max.val(this.min.val())
            }
        })

        this.floatingPointMode.on("click", () => 
        {
            if(this.floatingPointMode.hasClass("disabled"))
            {
                this.floatingPointMode.removeClass("disabled").addClass("enabled")
                this.maxNumbersAfterPoint.removeAttr('disabled')
                this.floatingPointMode.attr('data-state', true)
            }
            else
            {
                this.floatingPointMode.removeClass("enabled").addClass("disabled")
                this.maxNumbersAfterPoint.attr('disabled', 'disabled');
                this.floatingPointMode.attr('data-state', false)
            }
        })

        this.startBtn.on('click', () =>
        {
            obj.getValuesFromInterface(this)
            this.settings.fadeOut(500, () => 
            {
                $('.play').fadeIn(500).css("display","flex")
            })
            console.log(obj)
        })
    }
}


$(window).on('load', (e) => 
    {
        GameSettingsElements.initValues(GameSettings)
        GameSettingsElements.initActions(GameSettings)
    }
)
