import React from 'react'

const OverViewAllDetails = ({details}) => {
  return (<>
 
        {details.map((Detail,index)=>(<>
            <div className='OverViewAllDetails_main_container_div'>
                <div className='OverViewAllDetails_iconName'>
                    <Detail.icon style={{color:Detail.iconColor}} />
                    <p>{Detail.name}</p>
                </div>
                <div className='OverViewAllDetails_feature'>
                    <p>{Detail.feature} </p>
                </div>
                <div className='OverViewAllDetails_length'>
                    <p>{Detail.length} </p>
                </div>
            </div>
            <hr />
            </>
        )
        )}
</>
  )
}

export default OverViewAllDetails