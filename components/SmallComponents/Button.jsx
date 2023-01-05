import React from 'react'

function Button({word}) {
    const letters = word.split("")
    console.log({letters})
  return (
    <button>
        <span class="span-mother">
            {letters?.map(l => <span> {l} </span>)}
        </span>
        <span class="span-mother2">
            {letters?.map(l => <span> {l} </span>)}
            
        </span>
    </button>
  )
}

export default Button