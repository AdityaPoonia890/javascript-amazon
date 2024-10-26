import { currencyFormat } from "../script/utils/money.js";

describe ('test suite : currency format function',()=>{
  it('rounds of',()=>{
    expect(currencyFormat(2001)).toEqual('20.01');
  });
  
  it('converts into dollars',()=>{
    expect(currencyFormat(2045)).toEqual('20.45');
  })
});