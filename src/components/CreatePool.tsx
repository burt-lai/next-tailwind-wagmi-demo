import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

type CodeTemplate = {
  name: string;
  language: string;
  code: string;
}

const templates: CodeTemplate[] = [
  {
    name: 'Vyper',
    language: 'python',
    code: `# @external
# def validateTrade(
#         order: Order,
#         pool: PoolInfo,
#         position: PosInfo
#     ):

    side: OrderSide = OrderSide.Short
    if position.baseAmount > 0 :
        side = OrderSide.Long

    openPosVal: int256 = position.baseAmount * convert(order.price, int256)
    marginVal: int256 = openPosVal + position.quoteAmount
    marginRate: int256 = (marginVal * 10**4) / abs(openPosVal)
    assert marginRate >= 1000 or order.side != side # can not open more position when margin rate less than 10%

    totalLeverage: int256 = (convert(pool.posVal, int256) + abs(openPosVal)) * 10**3 / convert(pool.marginVal, int256)
    assert totalLeverage < 5000 # total leverage exceeds 5x

    newOpenPosVal: int256 = (position.baseAmount + convert(order.amount, int256)) * convert(order.price, int256)
    payPercent: int256 = (newOpenPosVal * 10**4) / convert(pool.idleAmount + pool.marginVal, int256)
    posPercent: int256  = (newOpenPosVal * 10**4) / convert(pool.posVal, int256)
    assert posPercent < 2000 or payPercent < 3000 # a single position exceeds 20% of the total position
`
  },
  {
    name: 'Solidity',
    language: 'sol',
    code: `// function validateTrade(
//     DataTypes.Order memory order,
//     DataTypes.PoolInfo memory pool,
//     DataTypes.PosInfo memory position
// ) external {
  DataTypes.OrderSide side = pool.baseAmount > 0
      ? DataTypes.OrderSide.Long
      : DataTypes.OrderSide.Short;

  int256 openPosVal = position.baseAmount * order.price;
  int256 marginVal = openPosVal + position.quoteAmount;
  int256 marginRate = (marginVal * 1e4) / abs(openPosVal);

  require(
      marginRate >= 1000 || order.side != side,
      "can not open more position when margin rate less than 10%"
  );

  int256 totalLeverage = (pool.posVal + abs(openPosVal)) *1e3 / pool.marginVal;

  require(totalLeverage < 5000, "total leverage exceeds 5x");

  int256 newOpenPosVal = (position.baseAmount + order.amount) * order.price;
  int256 payPercent = (newOpenPosVal * 1e4) / (poolInfo.idleAmount + poolInfo.marginVal);

  int256 posPercent = (newOpenPosVal * 1e4) / pool.posVal;

  require(posPercent < 2000 || payPercent < 3000, "a single position exceeds 20% of the total position");
// }`
  }
];

export const CreatePool = () => {

  const [template, setTemplate] = useState<CodeTemplate|undefined>();
  const [code, setCode] = useState<string|undefined>();

  useEffect(() => {
    setTemplate(templates[0]);
  }, []);

  useEffect(() => {
    setCode(template?.code);
  }, [template]);

  return (
    <div className="h-full flex w-full border-t border-gray-spx7">
      <div style={{ width: 'calc(100% - 360px)' }}>
        <div className="bg-[#252526] flex space-x-[1px]">
          {
            templates.map((t: CodeTemplate) => (
              <div className="h-[40px] flex items-center cursor-pointer px-5" key={t.language} style={{
                color: template?.language === t.language ? 'white': 'rgb(144 148 158)',
                background: template?.language === t.language ? '#1e1e1e': '#2d2d2d',
              }} onClick={() => setTemplate(t)}>{t.name}</div>
            ))
          }
     
        </div>
        <Editor height="calc(100vh - 114px)" width="100%" language={template?.language} theme="vs-dark" value={code} onChange={setCode} />
      </div>
      <div className="w-[360px] p-4">
        <div className="flex flex-col">
          <div className="text-xl font-semibold text-white">Create Pool</div>
          <div className="flex mt-3">
            <div className="bg-gray-spx6 rounded-full w-[42px] h-[42px] text-gray-spx4 items-center justify-center flex text-lg">1</div>
            <div className="flex flex-col ml-3">
              <div className="text-white">Compile contract</div>
              <div className="text-gray-spx4">Compile your fund strategies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}