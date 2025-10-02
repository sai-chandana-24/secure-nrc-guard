<Card 
  key={index}
  className="group relative overflow-hidden border-2 border-gray-200 bg-white hover:border-blue-500 transition-all duration-300 hover:shadow-2xl cursor-pointer"
>
  <div className={`absolute inset-0 bg-gradient-to-br ${dashboard.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

  <CardHeader className="relative pb-4">
    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${dashboard.bgGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
      <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
    </div>
    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
      {dashboard.title}
    </CardTitle>
    <CardDescription className="text-sm md:text-base text-gray-600">
      {dashboard.description}
    </CardDescription>
  </CardHeader>

  <CardContent className="relative">
    <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 pb-6 border-b border-gray-100">
      {Object.entries(dashboard.stats).map(([key, value]) => (
        <div key={key} className="text-center">
          <p className="text-lg md:text-2xl font-bold text-blue-600">{value}</p>
          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">{key}</p>
        </div>
      ))}
    </div>

    <Button 
      className={`w-full bg-gradient-to-r ${dashboard.bgGradient} hover:opacity-90 text-white font-semibold py-5 md:py-6 rounded-lg transition-all duration-300 group-hover:shadow-lg text-sm md:text-base`}
      aria-label={`Login to access ${dashboard.title}`}
    >
      <Link
        to={`/login?email=${encodeURIComponent(dashboard.email)}&redirect=/`}
        onClick={(e) => {
          e.preventDefault();
          if (isAuthenticated) logout();
          navigate(`/login?email=${encodeURIComponent(dashboard.email)}&redirect=/`);
        }}
        className="w-full h-full flex items-center justify-center"
      >
        {language === 'hi' ? 'लॉगिन करें' : 'Login to Access'}
        <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </Button>

    <p className="text-center text-xs text-gray-500 mt-3">
      {dashboard.email}
    </p>
  </CardContent>
</Card>
