function FoodCard({ name, amount, added, expiry, status }: any) {
  const statusColor = (
    {
      danger: "bg-red-300 text-red-900",
      warning: "bg-orange-200 text-orange-800",
      safe: "bg-green-100 text-green-800",
    } as any
  )[status.color];

  return (
    <div className="bg-white border rounded-md p-2 text-sm">
      <div className="font-bold">{name}</div>
      <div>보유 수량: {amount}</div>
      <div className="text-gray-500 text-xs">넣은 날짜: {added}</div>
      <div className="text-gray-500 text-xs">소비기한: {expiry}</div>
      <span
        className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${statusColor}`}
      >
        {status.label}
      </span>
    </div>
  );
}

function MainPage() {
  const freezerItems = [
    {
      name: "만두",
      amount: "2개",
      added: "2025-05-10",
      expiry: "2025-05-13",
      status: { label: "3일 남음", color: "warning" },
    },
    {
      name: "소고기",
      amount: "100g",
      added: "2025-05-08",
      expiry: "2025-05-16",
      status: { label: "4일 남음", color: "safe" },
    },
    {
      name: "냉동 피자",
      amount: "1개",
      added: "2025-04-25",
      expiry: "2025-06-01",
      status: { label: "20일 남음", color: "safe" },
    },
    {
      name: "만두",
      amount: "2개",
      added: "2025-05-05",
      expiry: "2025-05-12",
      status: { label: "오늘 만료!", color: "danger" },
    },
  ];

  const fridgeItems = [
    {
      name: "계란",
      amount: "10개",
      added: "2025-05-01",
      expiry: "2025-05-18",
      status: { label: "6일 남음", color: "safe" },
    },
    {
      name: "두부",
      amount: "1모",
      added: "2025-05-11",
      expiry: "2025-05-12",
      status: { label: "오늘 만료!", color: "danger" },
    },
    {
      name: "치즈",
      amount: "3장",
      added: "2025-05-03",
      expiry: "2025-05-20",
      status: { label: "8일 남음", color: "safe" },
    },
  ];

  const drawerItems = [
    {
      name: "양파",
      amount: "2개",
      added: "2025-05-09",
      expiry: "2025-05-17",
      status: { label: "5일 남음", color: "warning" },
    },
    {
      name: "당근",
      amount: "1개",
      added: "2025-05-08",
      expiry: "2025-05-16",
      status: { label: "4일 남음", color: "safe" },
    },
    {
      name: "파",
      amount: "3대",
      added: "2025-05-06",
      expiry: "2025-05-10",
      status: { label: "만료됨", color: "danger" },
    },
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-inner border w-full max-w-6xl mx-auto">
      {/* 냉장고 전체 구조 */}
      <div className="bg-white border-4 border-gray-300 rounded-xl overflow-hidden">
        {/* 냉동실 */}
        <div className="bg-blue-50 p-4 border-b-4 border-blue-300">
          <h2 className="text-lg font-bold mb-2">❄️ 냉동실</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {/* 냉동 아이템들 */}
            {freezerItems.map((item) => (
              <FoodCard key={item.name} {...item} />
            ))}
          </div>
        </div>

        {/* 냉장실 */}
        <div className="bg-gray-50 p-4 border-b-4 border-gray-300">
          <h2 className="text-lg font-bold mb-2">🧊 냉장실</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {fridgeItems.map((item) => (
              <FoodCard key={item.name} {...item} />
            ))}
          </div>
        </div>

        {/* 서랍 */}
        <div className="bg-yellow-50 p-4">
          <h2 className="text-lg font-bold mb-2">🗃️ 서랍</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {drawerItems.map((item) => (
              <FoodCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainPage;
