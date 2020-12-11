const quoteContainer=document.getElementById('quote-container')
const quoteText=document.getElementById("quote")
const quoteAuthor=document.getElementById("author")
const twitterButton=document.getElementById("twitter")
const newQuoteButton=document.getElementById("new-quote")
const loader=document.getElementById("loader")

let apiQuotes=[]

const showLoadingSpinner=()=>{
    
    quoteContainer.hidden=true
    loader.hidden=false
    

}

const removeLoadingpinner=()=>{
    if(!loader.hidden){
        loader.hidden=true 
        quoteContainer.hidden=false}
}

const newQuote=()=>{
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    const author=(quote.author?quote.author:"Unknown")
    quote.text.length>120?quoteText.classList.add("long-quote"):quoteText.classList.remove("long-quote")
    quoteText.textContent=quote.text
    quoteAuthor.textContent=author
}

const getQuote=async()=>{
    const proxyURL="https://cors-anywhere.herokuapp.com/"
    const apiURL="https://type.fit/api/quotes"
    try {
        showLoadingSpinner()
        const response=await fetch(apiURL)
        apiQuotes=await response.json()
        newQuote()
        removeLoadingpinner()

    } catch (error) {
        // getQuote()
        console.log("Ooopss!",error)
        
    }
}

// Tweet Quote
const tweetQuote=()=>{
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent} `
    window.open(twitterUrl,'_blank')
}

newQuoteButton.addEventListener('click',newQuote)
twitterButton.addEventListener('click',tweetQuote)

getQuote()